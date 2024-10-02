import LocalSource from "@/datasource/controller";

async function getAccountAmountFromLocalSource(number) {
    return LocalSource.getAccountAmount(number);
}

async function getAccountAmount(number) {
    try {
        const result = await getAccountAmountFromLocalSource(number);

        if (result.error) {
            return { error: 1, message: result.message || "Erreur dans l'extraction du montant du compte" };
        }

        return { error: 0, data: result.data };
    } catch (error) {
        return { error: 1, message: 'Unexpected error occurred: ' + error.message };
    }
}

async function getTransactionsForAccount(number){
    return LocalSource.getTransactionsForAccount(number)
}

export default {
    getAccountAmount,
    getTransactionsForAccount,
}