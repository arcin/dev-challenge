# encoding: utf-8

# Display Markdown documents to the user.

class DocsController < ApplicationController

  # displays 'tasklist.md', 'comments.md', and 'section_E.md' to the viewer.
  def readme
  ### REVIEW: The controller and action seem legit, but I was thrown off by the
  ### content being rendered. 'Docs' and 'Readme' make me think of documentation,
  ### but the stuff being rendered is pretty much just miscellaneous info.
  ### Conceptually, It might work better to fit them into a separate controller
  ### and action. You know, for science.
  end
end
