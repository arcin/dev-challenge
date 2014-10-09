require 'test_helper'

class DocsControllerTest < ActionController::TestCase
  ### Testing: Docs Controller
  test "should get readme" do
    get :readme
    assert_response :success
  end

  test "readme should render the correct template" do
    get :readme
    assert_template :readme
  end
end
