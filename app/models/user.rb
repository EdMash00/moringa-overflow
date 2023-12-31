class User < ApplicationRecord
    has_many :questions, dependent: :destroy
    has_many :answers,  dependent: :destroy
    has_many :favorites,    dependent: :destroy
    has_many :favorited_questions, through: :favorites, source: :question, dependent: :destroy
    has_many :reported_contents, dependent: :destroy
    has_many :notifications, dependent: :destroy
    has_secure_password

    validates :username, presence: true, uniqueness: { case_sensitive: false, message: "username must be unique" }
    validates :email, presence: true, uniqueness: { case_sensitive: false, message: "email must be unique" }
    validates :password, presence: true, length: { minimum: 6 }

    attr_accessor :password_reset_token
    attr_accessor :password_reset_token_expiration
    def generate_password_reset_token
        self.password_reset_token = SecureRandom.urlsafe_base64
        self.password_reset_token_expiration = 1.hour.from_now
    end
end