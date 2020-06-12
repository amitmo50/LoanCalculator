// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display = 'none';
  //show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});
document.getElementById('clear-form').addEventListener('submit', clearCalculator);

// Calculate results
function calculateResults(){
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterenst = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) / 12;

  // monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterenst.value = ((monthly * calculatedPayments) * principal).toFixed(2);
    //show restults
    document.getElementById('results').style.display = 'block';
    //hide the loader
    document.getElementById('loading').style.display = 'none';
  }else{
    showError('Please Check Your Numbers');
  }
}

function showError(error){
  //create a div
  const errorDiv = document.createElement('div');
  //get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add class
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  //clear error after 3 sec
  setTimeout(clearError, 3000);
}
function clearError(){
  document.querySelector('.alert').remove();
  document.getElementById('loading').style.display = 'none';
}
function clearCalculator(e){
  document.getElementById('amount').value = "";
  document.getElementById('interest').value = "";
  document.getElementById('years').value = "";
  document.getElementById('monthly-payment').value = "";
  document.getElementById('total-payment').value = "";
  document.getElementById('total-interest').value = "";
  document.getElementById('results').style.display = 'none';
  
  e.preventDefault();
}