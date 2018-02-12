$(function () {
    var model = {
        currentClicked: null,
        shapeList: [
            {
                id: 1,
                img: "R",
                count: 0,
                flag: false,
                clicked: 0
            },
            {
                id: 2,
                img: "E",
                count: 0,
                flag: false,
                clicked: 0

            },
            {
                id: 3,
                img: "Z",
                count: 0,
                flag: false,
                clicked: 0

            },
            {
                id: 4,
                img: "B",
                count: 0,
                flag: false,
                clicked: 0

            },
            {
                id: 5,
                img: "K",
                count: 0,
                flag: false,
                clicked: 0

            },
            {
                id: 6,
                img: "L",
                count: 0,
                flag: false,
                clicked: 0

            }
        ],
        getList: function () {
            return this.shapeList;

        }

    }
    var view = {
        init: function () {
            this.shapeList = octupus.getShapes();
            this.gamecontainer = $("#game-box");
            this.render();
        },
        render: function () {


            for (var i = 0; i < (this.shapeList.length * 2) / 3; i++) {

                var divrow = document.createElement('div');
                $(divrow).addClass('row');
                this.gamecontainer.append(divrow);
                for (var j = 0; j < 3; j++) {
                    do {

                        var currentItem = this.shapeList[Math.floor(Math.random() * this.shapeList.length)];
                    } while (currentItem.count > 2 || currentItem.count == 2);
                    if (currentItem.count < 2) {
                        currentItem.count++;
                        var col = document.createElement('div');
                        $(col).addClass('col-xs-4 col-md-4');
                        var shape = document.createElement('div');
                        $(shape).addClass('shape');
                        $(shape).addClass('shape' + currentItem.id);
                        $(shape).append('<h2 class="shape-icon">' + currentItem.img + '</h2>');
                        shape.addEventListener("click", function (item) {

                            return function () {
                                if (item.clicked == 0) {

                                    if (octupus.getCurrent() == null) {
                                        octupus.setCurrent(item);
                                        item.flag = true;
                                        item.clicked++;
                                        $(this).toggleClass('active');

                                    }
                                    else if (item.id == octupus.getCurrent().id) {
                                        $(this).toggleClass('active');
                                        setTimeout(function () { $('.shape' + item.id).addClass('matched'); }, 2000);
                                        octupus.removeItem(item);


                                    }
                                    else {
                                        $(this).toggleClass('active');
                                        setTimeout(function () { octupus.empty(); }, 2000);
                                    }


                                }
                                else if (item.id == octupus.getCurrent().id) {
                                    $(this).toggleClass('active');
                                    setTimeout(function () { $('.shape' + item.id).addClass('matched'); }, 2000);
                                    octupus.removeItem(item);
                                    
                                }
                                else {
                                    $(this).toggleClass('active');
                                    setTimeout(function () { octupus.empty(); }, 2000);


                                }
                            }



                        }(currentItem))
                        $(col).append(shape);
                        $(divrow).append(col);
                    }



                }




            }

        }
    }

    var octupus = {
     
        init: function () {
            view.init();
        },
        getShapes: function () {
            return model.getList();
        },

        setCurrent: function (_currentClicked) {
            model.currentClicked = _currentClicked;
        },
        getCurrent: function () {
            return model.currentClicked;
        },
        removeItem: function (item) {
            var list=model.getList();
            var removedItem = list.findIndex(e => e.id == item.id);
           list.splice(removedItem, 1);
           setTimeout(function () {
           if(list.length==0){
               $('.win').addClass('active');
           }},2000)

        },
        empty: function () {
            var list = model.getList();
            for (var i = 0; i < list.length; i++) {
                list[i].clicked = 0;
                list[i].flag = false;
                model.currentClicked = null;
                $('.shape').removeClass('active');
            }
        }


    }
    octupus.init();
});

