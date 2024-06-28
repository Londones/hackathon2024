import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

 const AlertCard = ({ title, alerts }) => {
    return (
        <>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {alerts.length === 0 ? (
                        <div className="flex items-center justify-center text-muted-foreground">
                            Pas d'alertes récente
                        </div>
                    ) : (
                        alerts.map((item, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <Badge variant="secondary">{item.maladie}</Badge>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-700">{item.date}</p>
                                    <p className="text-sm text-gray-600">{item.message}</p>
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