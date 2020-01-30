var currentTrees = 10;
            var pricePerTree = 15;
            function printTreesGetX(num) {
                var h = $('.grid').height();
                var w = $('.grid').width();
                var gridGap = 10;
                var l = 1,
                    r = Math.min(h, w);
                r = Math.min(200, r);
                var iter = 0;
                var eps = 0.005;
                while (l + eps < r) {

                    var mid = (l + r) / 2;
                    var x = mid;
                    var a = Math.floor((w + gridGap) / (x + gridGap));
                    var b = Math.floor((h + gridGap) / (x + gridGap));
                    if (num <= a * b) {
                        l = mid;
                    } else {
                        r = mid - eps;
                    }

                    iter++;
                    if (iter > 50) {
                        console.log(iter);
                    }
                }
                return l;
            }

            function printTrees(num) {
                var x = printTreesGetX(num);
                var str = "";
                for (var i = 0; i < num; i++) {
                    str = str + "<div class = 'icon'></div>";
                }
                console.log(x);
                $('.grid').css("grid-template-columns", "repeat(auto-fill, " + x + "px)");
                // $('.header_1').css("display", "none");
                document
                    .getElementById("grid")
                    .innerHTML = str;
                $('.icon').css("height", x + "px");

            }

            function assignHeightToGrid() {
                var screenHeight = screen.height;
                $('.grid').css('height', (screenHeight * 0.4) + 'px');
                keyPressed();
            }

            function keyPressed() {
                var number = document
                    .getElementById("numtrees")
                    .value;
                if (isNaN(number)) {
                    // console.log("NAN");
                    number = number.substring(0, number.length - 1);
                    document
                        .getElementById("numtrees")
                        .value = number;
                    keyPressed();
                    return;
                } else {
                    printTrees(number);
                    $(".totalPrice").text(pricePerTree * number);
                    $(".totalTrees").text(number);
                    // console.log("change");
                    document.getElementById("number_trees").value = number;
                    document.getElementById("totalprice").value = pricePerTree * number;

                }
            }

            var headerHeight = 82;
            var form;
            function init() {
				var footerHeight = $('#footer-container').height();
                $('.sectionz').css("min-height", window.innerHeight - headerHeight- footerHeight);
                console.log('footer' + footerHeight);
                $('.treePrice').text(pricePerTree);
				keyPressed();
                // document.getElementById("numtrees").value = number;
                // document.getElementById("totalprice").value = pricePerTree * number;
				assignHeightToGrid();
                form = document.forms[0];



            }

            $(document).ready(function () {
                init();
            });

            function proceedToPayment() {
                $(".sec2").css("display", "block");
                var $target = $('html,body');
                if (screen.width < 377) {
                    var st = 750;
                }
                else if (screen.width > 377) {
                    var st = $target.height();
                }
                $target.animate({
                    scrollTop: st
                }, 1000);
            }



            function checkNames(str)    {
                return /^[a-zA-Z]+$/.test(str);
            }

            function  checkEmail(str)   {
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str));
            }

            var fnameVal = -1;
            var lnameVal = -1;
            var emailVal = -1;
            var inputState = {};
            inputState["fname"] = -1;
            inputState["lname"] = -1;
            inputState["email"] = -1;

            //3 states
            //-1 : empty
            //0 : invalid
            //1  :  valid

            function removeClassInput(inputName, state) {
                var className = "";
                if(state == 0)  {
                    className = "is-invalid"
                }
                else if(state == 1) {
                    className = "is-valid"

                }

                form.elements[inputName].classList.remove(className);
            }

            function addClassInput(inputName, state)    {

                var className = "";
                if(state == 0)  {
                    className = "is-invalid"
                }
                else if(state == 1) {
                    className = "is-valid"

                }
                console.log(inputName);
                form.elements[inputName].classList.add(className);
            }

            function checkInputValue(str, type) {
                if(type == "email") return checkEmail(str);
                else    return checkNames(str);
            }


            function inputValidation(inputName) {
                var value = form.elements[inputName].value;
                if(value.length == 0)   {
                    if(value!=-1)   {
                        removeClassInput(inputName, inputState[inputName]);
                        inputState[inputName] = -1;
                    }
                }
                else if(checkInputValue(value, inputName))  {
                    if(inputState[inputName] == 0)  {
                        removeClassInput(inputName, inputState[inputName]);
                    }
                    if(inputState[inputName] != 1)  {
                        inputState[inputName] = 1;
                        addClassInput(inputName, inputState[inputName]);
                    }
                }
                else    {
                    if(inputState[inputName] == 1)  {
                        removeClassInput(inputName, inputState[inputName]);
                    }
                    if(inputState[inputName] != 0)  {
                        inputState[inputName] = 0;
                        addClassInput(inputName, inputState[inputName]);
                    }
                }
            }

            function formValidate() {



                if(inputState["fname"] != 1 || inputState["lname"] != 1 || inputState["email"] != 1)    {

                    alert("Form Error!");
                    return;
                }
                submitForm();
            }

            function submitForm()   {
                var fname = form.elements["fname"].value;
                var lname = form.elements["lname"].value;
                var email = form.elements["email"].value;

                
                // window.location = "/paywithpaytm?amount=20"
            }