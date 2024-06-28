import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

 const AlertCard = ({ title, alerts }) => {
    return (
        <>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {alerts.length === 0 ? (
                        <div className="flex items-center justify-center text-muted-foreground">
                            Pas d'alertes récente
                        </div>
                    ) : (
                        alerts.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item.maladie}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.date}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    {item.message}
                                </div>
                            </div>
                        )) 
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default AlertCard;