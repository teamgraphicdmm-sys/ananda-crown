fetch('http://localhost:3000')
  .then(res => {
    console.log('Root status:', res.status);
    return res.text();
  })
  .then(text => {
    console.log('Root body length:', text.length);
    console.log('Has florplan.png:', text.includes('/images/florplan.png'));
    console.log('Has contact link:', text.includes('href="/contact"'));
  })
  .then(() => fetch('http://localhost:3000/contact'))
  .then(res => {
    console.log('Contact status:', res.status);
    return res.text();
  })
  .then(text => {
    console.log('Contact body length:', text.length);
  })
  .catch(err => console.log('Fetch error:', err.message));
