import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// استخدم مجلد البناء الصحيح (مثلاً dist)
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

