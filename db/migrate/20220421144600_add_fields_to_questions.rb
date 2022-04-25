class AddFieldsToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :published, :boolean, default: false
    add_column :questions, :question_type, :string
    add_column :questions, :title_baseline, :string
    add_column :questions, :title_inverted, :string
    add_column :questions, :periodless_title, :string
    add_column :questions, :periodless_title_inverted, :string
    add_column :questions, :period_end_date, :date
  end
end
