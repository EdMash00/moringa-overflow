# app/controllers/reset_controller.rb

class ResetController < ApplicationController
  require 'sendgrid_mailer'
  skip_before_action :authorize_request, only: :request_reset

  def request_reset
    user = User.find_by(email: params[:email])

    if user
      reset_token = generate_reset_token(user)

      SendgridMailer.send_password_reset(user.email, reset_token).deliver_now

      render json: { message: 'Password reset email sent successfully.' }, status: :ok
    else
      render json: { error: 'Email not found.' }, status: :not_found
    end
  end

  private

  def generate_reset_token(user)
    token = SecureRandom.urlsafe_base64
    user.update(password_reset_token: token, password_reset_token_expiration: 1.hour.from_now)
    token
  end
end