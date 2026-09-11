from market.mandi_price_api import mandi_api

class PriceAnalyzer:
    def __init__(self):
        pass

    def get_summary(self, commodity, state=None):
        records = mandi_api.get_latest_prices(commodity=commodity, state=state)
        
        if not records:
            return f"Sorry, I couldn't find any recent price data for {commodity} in the selected region."

        # Compute summary
        modal_prices = [int(r['modal_price']) for r in records if 'modal_price' in r]
        if not modal_prices:
            return "Latest record for: {records[0]['market']}: Modal Price {records[0]['modal_price']}"

        avg_price = sum(modal_prices) / len(modal_prices)
        max_rec = max(records, key=lambda x: int(x['max_price']))
        min_rec = min(records, key=lambda x: int(x['min_price']))

        summary = f"Current Mandi Situation for **{commodity.capitalize()}**:\n"
        if state:
            summary += f"Region: {state.capitalize()}\n"
        
        summary += f"- **Average Market Rate**: ₹{avg_price:.2f} per quintal\n"
        summary += f"- **Highest Price**: ₹{max_rec['max_price']} in **{max_rec['market']}, {max_rec['district']}**\n"
        summary += f"- **Lowest Price**: ₹{min_rec['min_price']} in **{min_rec['market']}, {min_rec['district']}**\n"
        summary += f"- **Latest Arrival Date**: {records[0]['arrival_date']}\n\n"

        # Nearby comparisons
        if len(records) > 1:
            summary += "Nearby Market Comparisons:\n"
            for r in records[:5]:
                summary += f"* {r['market']}: ₹{r['modal_price']}\n"
        
        return summary

price_analyzer = PriceAnalyzer()
