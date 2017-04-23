class User < ActiveRecord::Base
	default_scope { order('created_at DESC') }
# Include default devise modules. Others available are:
# :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

	has_many :images, dependent: :destroy
	has_many :friendships, dependent: :destroy
	has_many :friends, through: :friendships, dependent: :destroy
	has_many :comments, dependent: :destroy


	def not_friend_with?(friend_id)
		friendships.where(friend_id: friend_id).count < 1
	end

	def except_current_user(users)
		users.reject { |user| user.id == self.id }
	end

	def self.search(param)
		return User.none if param.blank?

		param.strip!
		param.downcase!
		(name_matches(param) + email_matches(param)).uniq
	end

	def self.name_matches(param)
		matches('name', param)
	end

	def self.email_matches(param)
		matches('email', param)
	end

	def self.matches(field_name, param)
		where("lower(#{field_name}) like ?", "%#{param}%")
	end
end
