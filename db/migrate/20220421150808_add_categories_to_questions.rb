class AddCategoriesToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :categories, :string
  end
end
