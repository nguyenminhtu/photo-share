class AdminController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :require_admin?

  layout 'admin'

  def require_admin?
  	if current_user && current_user.id != 1
  		redirect_to root_path
  		flash[:error] = "Only admin can perform that action"
  	end
  end
end
