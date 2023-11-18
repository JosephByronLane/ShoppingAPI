import { DriverPackageNotInstalledError, getRepository } from 'typeorm';
import { Productos } from './models/Productos'; // adjust the import path according to your project structure

// categories:
// accomodation
// travel packages
// tours


const productData = [
    {
        "nombre": "Tropical Paradise Adventure",
        "descripcion": "A week-long adventure in a tropical paradise with beach resorts and jungle tours.",
        "precio": 1499.99,
        "categoria": "Travel packages",
        "fabricante": "Global Adventures",
        "cantidad_en_existencia": 30,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "European Highlights Tour",
        "descripcion": "Experience the best of Europe with this 10-day tour across historical landmarks.",
        "precio": 2199.99,
        "categoria": "Travel packages",
        "fabricante": "Continental Journeys",
        "cantidad_en_existencia": 15,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Safari Expedition",
        "descripcion": "An unforgettable safari experience in the Serengeti with wildlife sightings and luxury camping.",
        "precio": 2999.99,
        "categoria": "Travel packages",
        "fabricante": "Wildlife Voyages",
        "cantidad_en_existencia": 20,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Andean Explorer Journey",
        "descripcion": "Discover the mysteries of the Andes with this guided tour that includes Machu Picchu.",
        "precio": 1899.99,
        "categoria": "Travel packages",
        "fabricante": "Mountain Mysteries Tours",
        "cantidad_en_existencia": 25,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Caribbean Cruise Getaway",
        "descripcion": "A luxury cruise that takes you to the heart of the Caribbean's most stunning islands.",
        "precio": 1599.99,
        "categoria": "Travel packages",
        "fabricante": "Oceanic Cruises",
        "cantidad_en_existencia": 40,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Alaskan Wilderness Retreat",
        "descripcion": "Explore the Alaskan wilderness with guided tours of glaciers and national parks.",
        "precio": 2499.99,
        "categoria": "Travel packages",
        "fabricante": "Frontier Explorers",
        "cantidad_en_existencia": 20,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Ancient Egypt Discovery",
        "descripcion": "A cultural and historical tour of Egypt's ancient landmarks, including the Pyramids and the Nile.",
        "precio": 1999.99,
        "categoria": "Travel packages",
        "fabricante": "Time Travel Tours",
        "cantidad_en_existencia": 25,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Japanese Culture Experience",
        "descripcion": "Immerse yourself in Japanese culture with this tour of Tokyo, Kyoto, and Mount Fuji.",
        "precio": 2899.99,
        "categoria": "Travel packages",
        "fabricante": "Nippon Adventures",
        "cantidad_en_existencia": 18,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Australian Outback Adventure",
        "descripcion": "A rugged adventure through Australia's Outback with experienced guides.",
        "precio": 2599.99,
        "categoria": "Travel packages",
        "fabricante": "Down Under Tours",
        "cantidad_en_existencia": 22,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Arctic Expedition",
        "descripcion": "A journey to the Arctic Circle to experience the midnight sun and polar wildlife.",
        "precio": 3499.99,
        "categoria": "Travel packages",
        "fabricante": "Polar Adventures",
        "cantidad_en_existencia": 10,
        "unidad_de_medida": "package",
        "activo": 1
      },
      {
        "nombre": "Grand Canyon Helicopter Tour",
        "descripcion": "Experience breathtaking views of the Grand Canyon with this exclusive helicopter tour.",
        "precio": 499.99,
        "categoria": "Tours",
        "fabricante": "Sky High Tours",
        "cantidad_en_existencia": 50,
        "unidad_de_medida": "tour",
        "activo": 1
      },
      {
        "nombre": "Historic Rome Walking Tour",
        "descripcion": "Walk through history with a guided tour of Rome's ancient landmarks, including the Colosseum and Roman Forum.",
        "precio": 79.99,
        "categoria": "Tours",
        "fabricante": "Eternal City Guides",
        "cantidad_en_existencia": 100,
        "unidad_de_medida": "tour",
        "activo": 1
      },
      {
        "nombre": "Paris Night Bike Tour",
        "descripcion": "Discover the magic of Paris at night on a guided bike tour around the city's most iconic sights.",
        "precio": 99.99,
        "categoria": "Tours",
        "fabricante": "City Lights Cycling",
        "cantidad_en_existencia": 60,
        "unidad_de_medida": "tour",
        "activo": 1
      },
      {
        "nombre": "Luxury Beachfront Resort Stay",
        "descripcion": "Enjoy a lavish stay at our beachfront resort, featuring world-class amenities and breathtaking ocean views.",
        "precio": 299.99,
        "categoria": "Hotel stays",
        "fabricante": "OceanView Resorts",
        "cantidad_en_existencia": 20,
        "unidad_de_medida": "night",
        "activo": 1
      },
      {
        "nombre": "Mountain Cabin Retreat",
        "descripcion": "Escape to our cozy mountain cabin, nestled in the heart of the scenic wilderness.",
        "precio": 199.99,
        "categoria": "Hotel stays",
        "fabricante": "Highland Hideaways",
        "cantidad_en_existencia": 30,
        "unidad_de_medida": "night",
        "activo": 1
      },
      {
        "nombre": "Downtown Luxury Hotel Experience",
        "descripcion": "Experience the heart of the city in our luxury hotel, located within walking distance of major attractions.",
        "precio": 349.99,
        "categoria": "Hotel stays",
        "fabricante": "Urban Elite Hotels",
        "cantidad_en_existencia": 50,
        "unidad_de_medida": "night",
        "activo": 1
      },
      {
        "nombre": "Romantic Countryside Inn",
        "descripcion": "Spend a romantic getaway in our charming countryside inn, offering a peaceful and idyllic setting.",
        "precio": 179.99,
        "categoria": "Hotel stays",
        "fabricante": "Country Comfort Inns",
        "cantidad_en_existencia": 25,
        "unidad_de_medida": "night",
        "activo": 1
      },
      {
        "nombre": "Historic Boutique Hotel Stay",
        "descripcion": "Immerse yourself in history with a stay at our boutique hotel, housed in a beautifully restored historic building.",
        "precio": 259.99,
        "categoria": "Hotel stays",
        "fabricante": "Heritage Hotels",
        "cantidad_en_existencia": 40,
        "unidad_de_medida": "night",
        "activo": 1
      }
];

export async function seedProducts() {
    try {
        for (const data of productData) {
            const existingProduct = await Productos.findOneBy({ nombre: data.nombre });
    
            if (!existingProduct) {
                for (const data of productData) {
                    const producto = new Productos();
                    producto.nombre = data.nombre;
                    producto.descripcion = data.descripcion;
                    producto.precio = data.precio;
                    producto.categoria = data.categoria;
                    producto.fabricante = data.fabricante;
                    producto.cantidad_en_existencia = data.cantidad_en_existencia;
                    producto.unidad_de_medida = data.unidad_de_medida;
                    producto.activo = data.activo !== undefined ? data.activo : 1; 
        
                    await Productos.save(producto);
                    console.log('-----------------------------------')
                    console.log(`Added: ${data.nombre}`);
                    console.log('-----------------------------------')

                }
            } 
            else {
                console.log('-----------------------------------')
                console.log(`Product already exists: ${data.nombre}`);
                console.log('-----------------------------------')
            }
        }
    } catch (error) {
        console.error('Error seeding products:', error);
    }
}


