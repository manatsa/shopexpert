

    $(function() {
        $("#search-box").autocomplete({
            width: 300,
            max: 10,
            delay: 100,
            minLength: 1,
            autoFocus: true,
            cacheLength: 1,
            scroll: true,
            highlight: false,
            source: function(request, response) {
                $.ajax({
                    url : '/customers/search-active?term='+request.term, //Here we will user the URL that we want to hit
                    type : 'get',
                    async : true,
                    cache : false,
                    data : {
                        searchText : request.term
                    },
                    success : function(data) {
                        if (response) {
                            response($.map(data, function (item) {
                                return {
                                    label: item.name,
                                    value: item.name
                                };
                            }));
                        } else {
                            alert("failed try again...");
                        }
                    },
                    error : function() {
                        alert('System error occured, please try again ...');
                    }

                });
            },
            minLength: 2,
            maxResults: 10
        });
    });

    $( "#search-box" ).bind( "autocompleteselect", function(event, ui) {
        $.ajax({
            url: '/customers/search-customer-by-name?name='+ui.item.value,
            method:'GET',
            contentType: 'application/json'
        }).done(data=>{
            $('#search-box2').val(data.id)
        })

    });




