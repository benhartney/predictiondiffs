class AddStatusToQUestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :status, :string
  end
end
