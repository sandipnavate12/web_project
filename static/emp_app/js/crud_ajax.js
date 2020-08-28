$("form#removeEmployee").submit(function(){
  var id = $('input[name="id2"]').val().trim();

  $.ajax({
        url: '{% url "crud_ajax_delete" %}',
        data: {
            'id': id,
        },
        dataType: 'json',
        success: function (data) {
            if (data.deleted) {
              $("#example #employee-" + id).remove();
            }
        }
    });
});

$("form#updateEmp").submit(function() {
   var idInput = $('input[name="Id"]').val().trim();
   var firstnameInput = $('input[name="FirstName"]').val().trim();
   var lastnameInput = $('input[name="LastName"]').val().trim();
   var emailInput = $('input[name="Email"]').val().trim();
   var dobInput = $('input[name="dob"]').val().trim();
   var salaryInput = $('input[name="Salary"]').val().trim();
   var countryInput = $('input[name="country"]').val().trim();
   if (idInput && firstnameInput && lastnameInput && emailInput && salaryInput && countryInput ) {
         // Create Ajax Call
      $.ajax({
          url: '{% url "crud_ajax_update" %}',
          method:"POST",
          data: {
              'id': idInput,
              'first_name': firstnameInput,
              'last_name': lastnameInput,
              'e_mail': emailInput,
              'dob': dobInput,
              'salary': salaryInput,
              'country': countryInput
            },
            dataType: 'json',
            success: function (data) {
                if (data.employee) {
                  updateToEmployeeTabel(data.employee);
                }
            }
        });

    } else {
        alert("All fields must have a valid value.");
    }
    $('form#updateEmp').trigger("reset");
    $('#modaledit').modal('hide');
    return false;
});

$("form#addEmployee").submit(function() {
  var idInput = $('input[name="Id"]').val().trim();
  var firstnameInput = $('input[name="FirstName"]').val().trim();
  var lastnameInput = $('input[name="LastName"]').val().trim();
  var emailInput = $('input[name="Email"]').val().trim();
  var dobInput = $('input[name="dob"]').val().trim();
  var salaryInput = $('input[name="Salary"]').val().trim();
  var countryInput = $('input[name="country"]').val().trim();
  if (idInput && firstnameInput && lastnameInput && emailInput && dobInput && salaryInput && countryInput ) {
        // Create Ajax Call
        $.ajax({
            url: '{% url "crud_ajax_create" %}',
            data: {
                'id': idInput,
                'first_name': firstnameInput,
                'last_name': lastnameInput,
                'e_mail': emailInput,
                'dob': dobInput,
                'salary': salaryInput,
                'country': countryInput
            },
            dataType: 'json',
            success: function (data) {
                if (data.employee) {
                  appendToEmployeeTable(data.employee);

              }
            }
        });

    } else {
        alert("All fields must have a valid value.");
    }
    $('form#addEmployee').trigger("reset");
    $('#modaladd').modal('hide');
    return false;
});


// Update Django Ajax Call
function editEmployee(id) {
  if (id) {
    tr_id = "#employee-" + id;
    first_name = $(tr_id).find(".first_name").text();
    last_name = $(tr_id).find(".last_name").text();
    email = $(tr_id).find(".email").text();
    dob = $(tr_id).find(".dob").text();
    salary = $(tr_id).find(".salary").text();
    country = $(tr_id).find(".country").text();
    $('#id').val(id);
    $('#first_name').val(first_name);
    $('#last_name').val(last_name);
    $('#email').val(email);
    $('#dob').val(dob);
    $('#salary').val(salary);
    $('#country').val(country);
  }
}

function updateToEmployeeTabel(employee){
    $("#example #employee-" + employee.id).children(".employeeData").each(function() {
        var attr = $(this).attr("ID");
        if (attr == "first_name") {
          $(this).text(employee.first_name);
        } else if (attr == "last_name") {
          $(this).text(employee.last_name);
        }
        else if (attr == "e_mail") {
         $(this).text(employee.e_mail);
       }
       else if (attr == "dob") {
        $(this).text(employee.dob);
      }
      else if (attr == "salary") {
       $(this).text(employee.salary);
     } else {
          $(this).text(employee.country);
        }
      });
}

function deleteEmployee(id) {
  var action = confirm("Are you sure you want to delete this user?");
  if (action != false) {
    $.ajax({
        url: '{% url "crud_ajax_delete" %}',
        data: {
            'id': id,
        },
        dataType: 'json',
        success: function (data) {
            if (data.deleted) {
              $("#example #employee-" + id).remove();
            }
        }
    });
  }
}
