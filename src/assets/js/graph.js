window.onload = function () {

if($('#service-analysis-graph').length){
	
	var ctx = document.getElementById("service-analysis-graph").getContext('2d');
	var myChart = new Chart(ctx, {
	  type: 'doughnut',
	  data: {
		labels: ["Total Projects - 35% ", "Loan Prograns - 35% ", "Debt Prograns -  15%", "Profit -  15%"],
		datasets: [{
		  backgroundColor: [
			"#b855f1",
			"#1a9bff",
			"#f8bc3c"
		  ],
		  data: [35, 35, 15, 15]
		}]
	  },
	   options: {
		legend: {
		  display: false
		}
	  }
	});

}	


};