desc "This task is called by the Heroku scheduler add-on"
task :update_entries => :environment do
  Question.all.each do |question|
      @url = "https://www.metaculus.com/api2/questions/" + question.external_id + "/"
      p @url
      response = Faraday.get(@url)
      p response.status
      p response.headers
      p response.body
      question.update! data_from_api: response.body
  end
end