class RemoveFields < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :title_baseline
    remove_column :questions, :title_inverted
  end
end
