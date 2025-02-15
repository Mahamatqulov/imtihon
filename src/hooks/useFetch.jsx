export async function getAllData() {
  const req = await fetch("http://localhost:3000/data");
  if (req.status === 200) {
    return await req.json();
  } else {
    throw new Error("Xatolik yuzaga keldi ! ");
  }
}

export async function getOneData(id) {
  const req = await fetch(`http://localhost:3000/data/${id}`);
  if (req.status === 200) {
    return await req.json();
  } else {
    throw new Error("Xatolik yuzaga keldi ! ");
  }
}
