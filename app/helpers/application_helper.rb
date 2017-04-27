module ApplicationHelper
	def is_admin?
		if current_user && current_user.id == 1
			return true
		else
			return false
		end
	end
end
