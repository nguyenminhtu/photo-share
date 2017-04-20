class ImagesController < ApplicationController
	before_action :set_image, only: [:show, :edit, :update, :destroy, :upvote, :downvote]
	before_action :authenticate_user!
	before_action :require_same_user, only: [:edit, :update, :destroy]

	def index
		@users = current_user.friends
		@arr = []
		@users.each do |user|
			@arr.push(user.id)
		end
		@arr.push(current_user.id)
		@images = Image.all.where(user_id: @arr).order("created_at DESC").limit(9)
	end

	def show
	end

	def new
		@image = Image.new
	end

	def create
		@image = Image.new(image_params)
		@image.user = current_user

		if @image.save
			redirect_to image_path(@image)
			flash[:success] = 'Image was created successfully'
		else
			render 'new'
		end
	end

	def edit
	end

	def update
		respond_to do |f|
			if @image.update(image_params)
				f.html { redirect_to image_path(@image), notice: 'Image was updated successfully' }
				f.json { render :index, status: :liked, location: root_path }
			else
				f.html { render 'edit' }
				f.json { render json: { 'result': "fail" }, status: :unprocessable_entity }
			end
		end
	end

	def destroy
		@image.destroy
		redirect_to my_profile_path
		flash[:success] = "Image was deleted successfully"
	end

	def upvote
		@image.upvote_by current_user
		@id = @image.id
		# debugger
		respond_to do |format|
			format.html
			format.js
		end
	end

	def downvote
		@image.downvote_from current_user
		@id = @image.id
		# debugger
		respond_to do |format|
			format.html
			format.js
		end
	end

	def load_more
		if params[:id]
			if (params[:id]).to_i > (Image.first.id).to_i
				@images = Image.where('id < ?', params[:id]).limit(9).order("created_at DESC")
			end
			# debugger
		end
		respond_to do |format|
			format.html
			format.js
		end
	end

	
	private
		def image_params
			params.require(:image).permit(:title, :description, :picture, :user_id)
		end

		def set_image
			@image = Image.find(params[:id])
		end

		def require_same_user
			if @image.user != current_user
				flash[:danger] = "Only owner picture can perform that action"
				redirect_to root_path
			end
		end

end
