import { deployVercel } from "./serverAction"

export function createImprovedAction(originalPublishAction) {
  const BetterAction = (props) => {
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: () => {
        // Add our custom functionality
        deployVercel()
        // then delegate to original handler
        
        originalResult.onHandle()
      },
    }
  }
  return BetterAction
}
