class Comment < ActiveRecord::Base
	belongs_to :user
	belongs_to :image

	validates :content, presence: true
end
