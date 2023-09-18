export function formatNumber(number: number) {
   if (number >= 1_000_000_000) {
      return `${(number / 1_000_000_000).toFixed(1)}B`
   } else if (number >= 1_000_000) {
      return `${(number / 1_000_000).toFixed(1)}M`
   } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`
   } else {
      return number.toString()
   }
}

export function formatNumberWithDot(number: number) {
   return new Intl.NumberFormat('de-DE').format(number)
}
