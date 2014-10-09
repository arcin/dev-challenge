### Add ListWise Integration
module ListWise
  require 'httparty'

  @base = 'https://api.listwisehq.com/clean/quick.php'

  def self.email_status(email)
    options = { query: { email: email, api_key: '3775e817b40483db9ec9f48119cc96dc' }}
    response = HTTParty.get(@base, options)
    response.parsed_response["email_status"]
  end

  def self.clean?(email)
    email_status(email) == "clean"
  end
end