$(document).ready(function(){

/*************************************GET DATA FROM MLAB SERVER & UPDATE VIEW***************************************/

    var configs = require('./config');
    var db = 'test-graphql',
        collection = 'bikes',
        apiKey = configs.apiKey,
        url = `https://api.mlab.com/api/1/databases/${db}/collections/${collection}?apiKey=${apiKey}`;

    function fetchData(){

        $.ajax({
            url: url
        }).done(updateView);

    }

    function updateView(data){
    
        var showDataDiv = $('#show-data'),
            heading,
            addData,
            datum,
            showDataDiv_innerHtml;

        heading = `<div class="col-md-12 heading">`;
        heading+=`<span class="col-md-4">id</span>`;
        heading+=`<span class="col-md-4">name</span>`;
        heading+=`<span class="col-md-4">company</span>`;
        heading+=`</div>`;

        for(var key in data){
            if(key=='_id'){
                break;
            }
            datum = data[key];

            addData= `<div class="col-md-12 datum">`;
            addData+=`<span class="col-md-4">${datum.id}</span>`;
            addData+=`<span class="col-md-4">${datum.name}</span>`;
            addData+=`<span class="col-md-4">${datum.company}</span>`;
            addData+=`<button type="submit" class="btn btn-danger delete-btn">Delete</button>`;
            addData+=`</div>`;
            heading+=addData;
            
        }
        
        
        showDataDiv_innerHtml = showDataDiv.html();
        showDataDiv_innerHtml+=heading;
        showDataDiv.html(showDataDiv_innerHtml);
    }

    fetchData();



    /*************************************POST DATA TO MLAB SERVER***************************************/

    var addBtn = $('#add-btn');

    addBtn.click(grabData);

    function grabData(e){

        e.preventDefault();

        var formData = $('#insert-data input');

        postData(formData);
    }

    function postData(data){

        $.ajax({
            url: url,
            data: JSON.stringify({
                "id": $(data[0]).val(),
                "name": $(data[1]).val(),
                "company": $(data[2]).val()
            }),
            type: 'POST',
            contentType: 'application/json',
            success: successHandler,
            error: errorHandler 
        });
    }

    function successHandler(data){
   
        console.log('successfully posted data : ',data);
        location.reload();
    }

    function errorHandler(err){
        console.log('Sorry! ',err);
    }
});