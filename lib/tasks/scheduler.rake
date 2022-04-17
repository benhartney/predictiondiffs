desc "This task is called by the Heroku scheduler add-on"
task :update_entries => :environment do
  Question.all.each do |question|
      question.update_data_from_api
  end
end