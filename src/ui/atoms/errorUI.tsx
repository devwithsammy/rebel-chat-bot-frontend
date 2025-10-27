export const SimpleErrorUI = ({ message }: { message: string }) => {
    return ( 
        <div className="bg-red-50 dark:bg-transparent border border-red-200 dark:border-red-500 rounded-lg p-4 mb-8">
                <p className="text-red-800 dark:text-red-500">{message}</p>
              </div>
    )
}