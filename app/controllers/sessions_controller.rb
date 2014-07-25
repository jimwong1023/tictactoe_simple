class SessionsController < ApplicationController

  def new
  end

  def create
    user = Player.find_by_email(params[:session][:email].downcase)
    if user
      sign_in user
      redirect_to root_url
    else
      flash.now[:error] = "Invalid email"
      render 'new'
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
