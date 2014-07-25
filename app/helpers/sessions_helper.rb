module SessionsHelper

  def sign_in(user)
    session[:user_id] = user.id
  end

  def current_user
    Player.find(session[:user_id]) if signed_in?
  end

  def signed_in?
    session[:user_id]
  end

  def sign_out
    session[:user_id] = nil
  end
end