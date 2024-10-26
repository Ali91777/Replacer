const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`));

const {
    Client,
    GatewayIntentBits,
    ButtonBuilder,
    EmbedBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    Partials
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
});

client.setMaxListeners(0);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}`);
    client.user.setActivity(`.gg/flo1`, { type: "LISTENING" });
    client.user.setStatus("idle");
});

const prefix = "$";

const replace = [
    { word: "متوفر", replace: "مت9فر" },
    { word: "بيع", replace: "بي3" },
    { word: "شوب", replace: "ش9ب" },
    { word: "ديسكورد", replace: "ديس_ورد" },
    { word: "تبادل", replace: "تبا1دل" },
    { word: "توكن", replace: "ت9كن" },
    { word: "بوست", replace: "ب9ست" },
    { word: "توكنات", replace: "ت9كنات" },
    { word: "بوستات", replace: "ب9ستات" },
    { word: "بوت", replace: "بـ9ـت" },
    { word: "حساب", replace: "حس1ب" },
    { word: "حسابات", replace: "حس1ب1ت" },
    { word: "نتفيلكس", replace: "ن$$فيلكس" },
    { word: "اون", replace: "ا9ن" },
    { word: "متجر", replace: "متجr" },
    { word: "سعر", replace: "س3ر" },
    { word: "مطلوب", replace: "مطل9ب" },
    { word: "دولار", replace: "دولاr" },
    { word: "سيرفر", replace: "سيرفr" },
    { word: "روبوكس", replace: "ر9بوكس" },
    { word: "فيزا", replace: "فيـzا" },
    { word: "اسعار", replace: "اسـ3ار" },
    { word: "نيترو", replace: "نيتر9" },
    { word: "شراء", replace: "شrاء" },
];

client.on("messageCreate", async (message) => {
    if (message.content.startsWith(prefix + "تشفير")) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        const embed = new EmbedBuilder()
            .setTitle("Replacer")
            .setDescription("**لـ تـشـفـيـر مـنـشـورك قـم بـالـضـغـط عـلـي الـزر .**")
            .setColor("Random")
            .setThumbnail(message.guild.iconURL());

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle("Secondary")
                .setLabel("تشفير")
                .setCustomId("replace")
        );
        message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on("interactionCreate", async (i) => {
    if (!i.isButton()) return;
    if (i.customId === "replace") {
        const modal = new ModalBuilder()
            .setTitle("Replacer")
            .setCustomId("rep");

        const replacer = new TextInputBuilder()
            .setCustomId("replacetext")
            .setLabel("قـم بـ وضـع مـنـشـورك هـنـا .")
            .setPlaceholder("ضع منشورك هنا")
            .setMaxLength(4000)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const row = new ActionRowBuilder().addComponents(replacer);
        modal.addComponents(row);
        await i.showModal(modal);
    }
});

client.on("interactionCreate", async (i) => {
    if (!i.isModalSubmit()) return;
    if (i.customId === "rep") {
        let text = i.fields.getTextInputValue("replacetext");
        let replaced = false;

        replace.forEach((t) => {
            const regex = new RegExp(t.word, "g");
            if (regex.test(text)) {
                text = text.replace(regex, t.replace);
                replaced = true;
            }
        });

        if (replaced) {
            await i.reply({
                content: `\`المنشور بعد التشفير :\`\n\n ${text}`,
                ephemeral: true
            });
        } else {
            await i.reply({ content: "**منشورك لا يحتاج للتشفير**", ephemeral: true });
        }
    }
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception occurred:", error);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled promise rejection:", reason);
});

// Login the bot

client.login("");