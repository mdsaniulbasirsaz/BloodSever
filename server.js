const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
const { Agent } = require('http');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
mongoose.connect('mongodb+srv://saniulsaz:12345@roktodin.abnxvco.mongodb.net/BloodSever', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));



// Serve static files from the  directory
app.use(express.static(path.join(__dirname,'src')));
app.use(express.static(path.join(__dirname, 'images')));


//Handle the root route
app.get('/',(req,res) =>{
        res.sendFile(path.join(__dirname,'src','index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'register.html'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
    });
});


app.get('/apositive', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','apositive.html'));
})

app.get('/anegative', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','anegative.html'));
})

app.get('/bpositive', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','bpositive.html'));
})

app.get('/bnegative', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','bnegative.html'));
})

app.get('/abpositive', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','abpositive.html'));
})

app.get('/abnegative', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','abnegative.html'));
})

app.get('/opositive', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','opositive.html'));
})

app.get('/onegative', (req,res)=>{
    res.sendFile(path.join(__dirname,'src','onegative.html'));
})








// Define a schema
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    bgroup: String,
    lastDonation: String,
});
const User = mongoose.model('User', userSchema);
module.exports = User;

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get users by blood group
app.get('/users/blood-group/:group', async (req, res) => {
    try {
        const bloodGroup = req.params.group;
        const users = await User.find({ bgroup: bloodGroup });
        if (users.length === 0) {
            return res.status(404).send('No users found with this blood group');
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});






// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});