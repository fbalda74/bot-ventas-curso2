const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { textToVoice } = require("../services/eventlab");

module.exports = addKeyword(EVENTS.ACTION)
    .addAction((_, { endFlow, globalState }) => {

        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) {
            return endFlow();
        }

    })
    .addAnswer(
        ["dame un momento... mejor te envio nota de voz"],
        null,
        async (_, { flowDynamic, state }) => {
            console.log("🙉 texto a voz....");
            const currentState = state.getMyState();
            const path = await textToVoice(currentState.answer);
            console.log(`🙉 Fin texto a voz....[PATH]:${path}`);
            await flowDynamic([{ body: "escucha", media: path }]);
        }
    );