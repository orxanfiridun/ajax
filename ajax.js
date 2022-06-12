$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer a2e6c995dc5e8dfd31a0aab93fe655b22a6e39a1f377051d162c65155297e040');
    },
});

let domain = 'https://gorest.co.in'


let Data = [];



function Cedvel() {
    let x = `
      <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>GENDER</th>
          <th>STATUS</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    `
    return x;
};
function CedveliGoster(array) {
    let table = Cedvel();
    $('#container').empty().append(table);
    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        let setir = TR(obj);
        $('tbody').append(setir);
    }
};
function TR(obj) {
    let x = `
      <tr>
       <td class="id">${obj.id}</td>
       <td>${obj.name}</td>
       <td>${obj.email}</td>
       <td>${obj.gender}</td>
       <td>${obj.status}</td>
       <td id="delete" data-id="${obj.id}">X</td>
      </tr>
    `
    return x;
};

$('#melumat').on('click', function () {
    $.ajax({

        url: "https://gorest.co.in/public/v2/users",
        method: "get",
        success: function (data) {
            Data = data;
            CedveliGoster(Data);

        },
        error: function (error) {
            console.log({ error })
        }
    });
});

$('#container').on('click', '#delete', function () {
    // let id = $(this).parent().find('.x').html();
    let id = $(this).attr('data-id');
    $.ajax({
        url: 'https://gorest.co.in/public/v2/users/' + id,
        method: 'delete',
        success: function (x) {
            alert('melumatlar silindi');
            $('#melumat').click();
        },
        error: function (y) {
            alert('melumat siline bilmedi')
        }
    })
});

$('#container').on('dblclick', '.id', function () {
    let id = $(this).html();
    $.ajax({
        url: 'https://gorest.co.in/public/v2/users/' + id,
        method: 'get',
        success: function (obj) {
            let ul = `
             <ul>
                <li>${obj.id}</li>
                <li>${obj.name}</li>
                <li>${obj.email}</li>
                <li>${obj.gender}</li>
                <li>${obj.status}</li>
             </ul>
            
            `;
            $('#detay').empty().append(ul);

            $('#name').val(obj.name);
            $('#email').val(obj.email);
            $('#gender').val(obj.gender);
            $('#status').val(obj.status);

            $('#qeydet').attr('data-id', obj.id);

        },
        error: function (y) {
            alert('error')
        }
    })
});

$('#qeydet').on('click', function () {
    let name = $('#name').val();
    let email = $('#email').val();
    let gender = $('#gender').val();
    let status = $('#status').val();
    let id = $('#qeydet').attr('data-id')

    let obj = {
        id: 0, name, email, gender, status
    };

    let method = 'post';
    let id2 = "";
    if (id > 0) {
        method = 'put';
        id2 = "/" + id;

    }

    $.ajax({
        url: 'https://gorest.co.in/public/v2/users' + id2,
        method,
        data: obj,
        success: function (data) {
            alert('melumat qeyd olundu');
            $('#melumat').click();
            $('input').each(
                function () {
                    $(this).val('')
                }
            ),
                $('#qeydet').attr('data-id', "0");
        },
        error: function () {
            alert('melumat qeyd oluna bilmedi')
        }
    })
})