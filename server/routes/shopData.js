import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";

const shopDataRouter = Router();

// Route to fetch shop name
shopDataRouter.get("/info", async (req, res) => {
  try {
    // Get the client for the current shop
    const { client } = await clientProvider.offline.graphqlClient({
      shop: res.locals.user_session.shop, // Assuming you're storing shop info in user session
    });

    // Execute GraphQL query to get the shop name
    const shop = await client.request(`
      {
        shop {
          name
        }
      }
    `);

    // Respond with the shop name
    return res.status(200).json({ shopName: shop.data.shop.name });
  } catch (error) {
    console.error("Error fetching shop name:", error);
    return res.status(500).json({ error: "Failed to retrieve shop name" });
  }
});

export default shopDataRouter;
