$(document).ready(function () {
  //shuffle function for fake random
  function shuffle(array) {
    var currentIndex = array.length;
    // var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      var randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      var temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  const STORAGE_KEY = "wishes";

  //numbers arr for fake random
  var arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  shuffle(arr);

  //if one leaf has been clicked
  $("body").on("click", ".leaf_group", lookWishDetails);

  //see the wish detials
  //note:  get data from SharePoint, modfy here
  //push data in modal
  function lookWishDetails() {
    //get the content of the leaf been clicked
    var to_modal_content = $(this).find(".wish_on_leaf").text();
    var to_modal_name = $(this).find(".name_on_leaf").text();
    var to_modal_time = $(this).find(".time_tag").text();

    //push data to modal
    $("#modal_content").text(to_modal_content);
    $("#modal_name").text(to_modal_name);
    $("#modal_time").text(to_modal_time);
    //show the modal
    $("#myModal").modal();
  }

  //wish_data is a array of wish content
  var wish_data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wish_data));
  // n is for the fake random position
  var n = 0;
  var WishNo = 0;
  var wishText;
  var nameText;
  var timeText;

  //add the data from sharepoint
  // from_localstorage();
  loadWishesFromFirebase();

  //creat a leaf when click make a wish button
  $("#make_wish").click(function () {
    //check if has content, make sure no empty
    if ($("#wish_content").val() && $("#wisher_name").val()) {
      wishText = $("#wish_content").val();
      nameText = $("#wisher_name").val();
      timeText = new Date().toLocaleString("en-IN");
      prepare_data();
      saveWishes(wishText,nameText,timeText);
      creatALeaf(wish_data);

      // after creat the leaf, reset the textarea for next wish
      $("#wish_content").val("");
      $("#wisher_name").val("");
      $(".counter").text("200 / 200");

      //make a magic sound
      new Audio(
        "../audio/wish-audio.mp3"
      ).play();
    } else {
      // if empty, alert the user
      alert("Please enter your wishes and name in the typearea.");
    }
  });

  function saveWishes(wishText,nameText,timeText) {
    // if ($("#wish_content").val() && $("#wisher_name").val()) {
    // wishText = $("#wish_content").val();
    // nameText = $("#wisher_name").val();
    // timeText = new Date().toLocaleDateString("en-IN");

     var newWish = {
      wish: wishText,
      name: nameText,
      time: timeText
    };
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(wish_data));
    guestbookRef.push(newWish).then(() => {
      $("#wish_content").val("");
      $("#wisher_name").val("");
      $(".counter").text("200 / 200");
      new Audio("../audio/wish-audio.mp3").play();
    }).catch((error) => {
      alert('Error saving wish: ' + error.message);
    });
  }

  function loadWishesFromFirebase() {
  guestbookRef.off(); // Clear previous listeners to avoid duplicates

  guestbookRef.on('value', snapshot => {
    var firebaseData = snapshot.val() || {};
    var wishesArray = [];

    Object.keys(firebaseData).forEach(key => {
      wishesArray.push(firebaseData[key]);
      prepare_data();
    });
    wish_data = wishesArray
    creatALeaf(wish_data);
  });
}

  function from_localstorage() {
    let localWishes = JSON.parse(localStorage.getItem(STORAGE_KEY));

    $.each(localWishes, function (message) {
      wishText = message.wish;
      nameText = message.name;
      timeText = message.time;
      prepare_data();
    });
    creatALeaf(wish_data);
  }

  //import data
  function prepare_data() {
    var Num = Math.floor(Math.random() * 3) + 1;
    var FakeRandomTop = [
      24, 51, 89, 25, 53, 36, 80, 36, 50, 51, 41, 55, 72, 16, 80, 78, 34, 85,
      71, 40, 96, 17, 87, 71,
    ];
    var FakeRandomLeft = [
      6, 76, 37, 44, 32, 79, 55, 89, 54, -8, 29, 2, 48, 17, 86, 25, 56, 66, 6,
      53, 57, 57, 35, 92,
    ];
    var FakeRandomRotate = [
      131, 281, 48, 169, 92, 209, 195, 265, 237, 111, 138, 172, 149, 187, 312,
      71, 220, 218, 91, 126, 289, 220, 156, 251,
    ];

    wish_data.push({
      wish: wishText,
      name: nameText,
      time: timeText,
      wish_num: WishNo,
      num: Num,
      top: FakeRandomTop[arr[n]],
      left: FakeRandomLeft[arr[n]],
      rotate: FakeRandomRotate[arr[n]],
    });

    WishNo += 1;
    //use the number in arr to fake the random without duplication, so a position only has one leaf, in a loop
    if (n < arr.length - 1) {
      n += 1;
    }
    // if the arr has been run out once, reset the arr order and n
    else if (n === arr.length - 1) {
      shuffle(arr);
      n = 0;
    }
  }

  function CreatALeaf(data) {
  $(".leaf_test").empty();

  $.each(data, function (_, message) {
    // generate random or fixed pos/rotation for each leaf if not saved
    var top = Math.random() * 90 + 5; // 5% - 95% height
    var left = Math.random() * 90 + 5; // 5% - 95% left
    var rotate = Math.random() * 360;

    var txt1 = `<div style="top:${top}%; left:${left}%; transform:rotate(${rotate}deg)"
      class="leaf_group" >
      <p class="text_on_leaf wish_on_leaf">${message.wish}</p>
      <p class="text_on_leaf name_on_leaf">${message.name}</p>
      <p class="text_on_leaf time_tag">${message.time}</p>
    </div>`;
    $(".leaf_test").append(txt1);
  });
}

  //creat a new leaf fucntion
  function creatALeaf(data) {
    $(".leaf_test")[0].innerHTML ="";
    $.each(data, function(_, message) {
      if(message.wish)
      var txt1 =
        "<div data-rotate=" +
        message.rotate +
        " message-orig=" +
        message.rotate +
        ' id="wish_' +
        message.wish_num +
        '" class="leaf_group leaf_' +
        message.num +
        '" style="top:' +
        message.top +
        "%; left:" +
        message.left +
        "%; transform:rotate(" +
        message.rotate +
        'deg)"><p class="text_on_leaf wish_on_leaf">' +
        message.wish +
        '</p><p class="text_on_leaf name_on_leaf">' +
        message.name +
        '</p><p class="text_on_leaf time_tag">' +
        message.time +
        "</p></div>";
      $(".leaf_test").append(txt1);
    });
  }

  //character remain in the text area
  $("#wish_content").keyup(function () {
    var postlength = $(this).val().length;
    var charactersLeft = 200 - postlength;
    $(".counter").text(charactersLeft + " / 200");
  });

  // set the interval between two wind
  var BreezeAll = setInterval(BreezeLeft, 4800);

  //breeze animation - rotate function
  function BreezeLeft() {
    var handle_1 = 0;
    var blow_handle = setInterval(function () {
      //change the 25 to any number if wanna change the movement distance
      if (handle_1 < 25) {
        for (let i = 0; i < WishNo; i++) {
          var css_id = "#wish_" + i;
          //check the deg of each leaf, the deg of wind is 250deg to 70deg, change the number to change the deg of wind
          if ($(css_id).data("orig") > 110 && $(css_id).data("orig") <= 340) {
            //change 0.5 to any number to change the step
            var RotateValue = $(css_id).data("rotate") + 0.5;
          } else {
            var RotateValue = $(css_id).data("rotate") - 0.5;
          }
          var cssValue = "rotate(" + RotateValue + "deg)";
          $(css_id).css("transform", cssValue);
          $(css_id).data("rotate", RotateValue);
        }
        handle_1 += 1;
      } else {
        clearInterval(blow_handle);
        FallBack();
      }
      //change the 60 to any number to change the blow duration
    }, 60);
  }

  //leaves falls back
  function FallBack() {
    var handle_2 = 0;
    var fall_handle = setInterval(function () {
      if (handle_2 < 25) {
        for (let i = 0; i < WishNo; i++) {
          var css_id = "#wish_" + i;
          if ($(css_id).data("orig") > 110 && $(css_id).data("orig") <= 340) {
            var RotateValue = $(css_id).data("rotate") - 0.5;
          } else {
            var RotateValue = $(css_id).data("rotate") + 0.5;
          }
          var cssValue = "rotate(" + RotateValue + "deg)";
          $(css_id).css("transform", cssValue);
          $(css_id).data("rotate", RotateValue);
        }
        handle_2 += 1;
      } else {
        clearInterval(fall_handle);
      }
    }, 50);
  }
});
