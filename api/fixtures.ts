import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";
import User from "./models/User";
import Item from "./models/Item";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ["categories", "items", "users"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [Elena, Marina, Sergay, Mikhail] = await User.create(
    {
      username: "elena228",
      password: "123321",
      displayName: "Elena Ivanova",
      phoneNumber: 996700123456,
      token: crypto.randomUUID(),
    },
    {
      username: "Marina",
      password: "123321",
      displayName: "MarineCorps",
      phoneNumber: 996500112233,
      token: crypto.randomUUID(),
    },
    {
      username: "Sergay",
      password: "123321",
      displayName: "Seryozha ^^",
      phoneNumber: 996770114477,
      token: crypto.randomUUID(),
    },
    {
      username: "Mikhail",
      password: "123321",
      displayName: "Mishka",
      phoneNumber: 996500500500,
      token: crypto.randomUUID(),
    }
  );

  const [Mouse, Keyboard, Monitor, Headset] = await Category.create(
    {
      title: "Mouse",
    },
    {
      title: "Keyboard",
    },
    {
      title: "Monitor",
    },
    {
      title: "Headset",
    }
  );

  await Item.create(
    {
      user: Elena,
      title: "Razer Viper mini",
      description: "Hey im selling gaming mouse, call me if u interested",
      category: Mouse,
      image: "fixtures/razer.jpg",
      price: 2500,
    },
    {
      user: Marina,
      title: "Varmilo vea 108",
      description:
        "100% mechanical keyboard on red switches, text me if u wanna buy it",
      category: Keyboard,
      image: "fixtures/varmilo.jpg",
      price: 11000,
    },
    {
      user: Sergay,
      title: "MSI G2412",
      description:
        "1920x1080p resolution, 170hz, 24inch, very cool gaming monitor",
      category: Monitor,
      image: "fixtures/msi.png",
      price: 10500,
    },
    {
      user: Mikhail,
      title: "HyperX Cloud Alpha S",
      description:
        "Hello everyone! Im selling brand new headset from HyperX. Very cool sound, just try once and you will never come back to your old sound!",
      category: Headset,
      image: "fixtures/hyperx.jpg",
      price: 7500,
    }
  );

  await db.close();
};

void run();
