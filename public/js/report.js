document.getElementById('reports-btn').addEventListener('click', function() {
    window.location.href = '/report';
  });
  
  const viewAllReportsBtn = document.getElementById('view-all-reports');
  if (viewAllReportsBtn) {
    viewAllReportsBtn.addEventListener('click', function() {
      window.location.href = '/allreports';
    });
  }