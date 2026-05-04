// 
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/GLAians").then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(`Error Occurred: ${err}`);
});
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade:Number
});

// Create a model.
const Student = mongoose.model("Student", studentSchema);
async function insertdata(){
    const s1 = new Student({
        name: "Deepak Sharma",
        age: 20,
        grade: 85
    });
    await s1.save();
    console.log("Data Inserted Successfully✅");
    const data= await Student.find();
    console.log("Data is :",data);
}

// READ (All Students).
async function readAll() {
    const data = await Student.find();
    console.log("All Students📖:", data);
}

// READ (Single Student).
async function readOne() {
    const data = await Student.findOne({ name: "Deepak Sharma" });
    console.log("Single Student📖:", data);
}

// UPDATE.
async function updateData() {
    const updated = await Student.findOneAndUpdate(
        { name: "Deepak Sharma" },
        { grade: 95 },
        { new: true }
    );
    console.log("Updated Data✏️:", updated);
}

// DELETE.
async function deleteData() {
    const deleted = await Student.findOneAndDelete({
        name: "Deepak Sharma"
    });
    console.log("Deleted Data❌:", deleted);
}

// Run All Operations.
async function runCRUD() {
    await insertdata();   // Create + Initial Read.
    await readAll();      // Read All.
    await readOne();      // Read One.
    await updateData();   // Update.
    await readAll();      // Verify Update.
    await deleteData();   // Delete.
    await readAll();      // Verify Delete.
}

runCRUD();