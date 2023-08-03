class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.string :message
      t.integer :user_id
      t.boolean :is_read, default: false

      t.timestamps
    end
  end
end
