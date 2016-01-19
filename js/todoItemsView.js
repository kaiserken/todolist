var TodoItemsView = Backbone.View.extend({

  id: "todoItemsContainer",

  initialize: function(options){
    if(!(options && options.model))
      throw new Error('model is not specified');

    this.model.on("add", this.onAddTodoItem, this);
    this.model.on("remove", this.onRemoveTodoItem, this);
  },

  events: {
    "keypress #newTodoItem": "onkeyPress"
  },

  onRemoveTodoItem: function(todoItem){
    this.$("li#" + todoItem.id).remove();
  },

  onkeyPress: function(e){
    if(e.keyCode === 13){
      var $textBox = this.$("#newTodoItem");
      if($textBox.val()){
        var todoItem = new TodoItem({ title: $textBox.val() });
        this.model.create(todoItem);
      }
      $textBox.val("");
    }
  },
  onAddTodoItem: function(todoItem){
    var view  = new TodoItemView({ model: todoItem});
    this.$("#todoItems").append(view.render().$el);

  },


  render: function(){
    var template  = $("#todoItemsTemplate").html();
    var html  = Mustache.render(template);
    this.$el.html(html);

    return this;
  }
});
