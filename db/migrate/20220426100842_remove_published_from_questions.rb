class RemovePublishedFromQuestions < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :published
  end
end
