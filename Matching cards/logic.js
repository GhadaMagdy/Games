$(function () {
    var model = {
        currentClicked: null,
        shapeList: [
            {
                id: 1,
                img: "fa fa-car",
                count: 0,
                flag: false,
                clicked: 0
            },
            {
                id: 2,
                img: "fa fa-camera",
                count: 0,
                flag: false,
                clicked: 0

            },
            {
                id: 3,
                img: "fa fa-child",
                count: 0,
                flag: false,
                clicked: 0
            },
            {
                id: 4,
                img: "fa fa-balance-scale",
                count: 0,
                flag: false,
                clicked: 0

            },
            {
                id: 5,
                img: "fa fa-university",
                count: 0,
                flag: false,
                clicked: 0

            },
            {
                id: 6,
                img: "fa fa-bicycle",
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
            var counter=0;
            for (var i = 0; i < (this.shapeList.length * 2) / 3; i++) {

                var divrow = document.createElement('div');
                $(divrow).addClass('row');
                this.gamecontainer.append(divrow);
                for (var j = 0; j < 3; j++) {
                    counter++;
                    do {

                        var currentItem = this.shapeList[Math.floor(Math.random() * this.shapeList.length)];
                    } while (currentItem.count > 2 || currentItem.count == 2);
                    if (currentItem.count < 2) {
                        currentItem.count++;
                        var col = document.createElement('div');
                        $(col).addClass('col-xs-4 col-md-4');
                        var shapeContainer = document.createElement('div');
                        $(shapeContainer).addClass('shape-container');
                                                
                        var shape = document.createElement('div');
                        $(shape).addClass('shape');
                        $(shape).addClass('shape' + currentItem.id);   
                        $(shape).append('<div class="side"></div>');                                            
                        $(shape).append('<div class="side back"><i class="'+ currentItem.img +'" aria-hidden="true"></i></div>');
                        $(shape).attr('position',counter);
                        shape.addEventListener("click", function (item) {

                            return function () {
                                if (item.clicked == 0) {

                                    if (octupus.getCurrent().item == null) {
                                        octupus.setCurrent(item,shape);
                                        item.flag = true;
                                        item.clicked++;
                                        $(this).toggleClass('active');

                                    }
                                    else if (item.id == octupus.getCurrent().item.id && $(shape).attr('position')!=$(octupus.getCurrent().shape).attr('position')) {
                                        $(this).toggleClass('active');
                                        setTimeout(function () { $('.shape' + item.id).addClass('matched'); }, 2000);
                                        octupus.removeItem(item);


                                    }
                                    else {
                                        $(this).toggleClass('active');
                                        setTimeout(function () { octupus.empty(); }, 2000);
                                    }


                                }
                                else if (item.id == octupus.getCurrent().item.id && $(shape).attr('position')!=$(octupus.getCurrent().shape).attr('position')) {
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
                        $(shapeContainer).append(shape);
                        $(col).append(shapeContainer);
                        $(divrow).append(col);
                    }



                }




            }

        }
    }

    var octupus = {
        currentclickedShape:null,
        init: function () {
            view.init();
        },
        getShapes: function () {
            return model.getList();
        },

        setCurrent: function (_currentClicked,shape) {
            model.currentClicked = _currentClicked;
            this.currentclickedShape=shape;
        },
        getCurrent: function () {
            return {item:model.currentClicked,
                shape:this.currentclickedShape}
             
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

