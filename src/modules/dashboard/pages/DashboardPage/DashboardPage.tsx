import Card from "../../../../shared/components/Card";

import "./DashboardPage.css";

export default function DashboardPage() {
    return (
        <div className="dashboard-page">
            <header className="dashboard-page__header">
                <div>
                    <h1 className="dashboard-page__title">
                        Dashboard
                    </h1>

                    <p className="dashboard-page__subtitle">
                        Bienvenido a UNERP.
                    </p>
                </div>
            </header>

            <section className="dashboard-page__content">
                <Card>
                    Bienvenido al sistema.
                </Card>
            </section>
        </div>
    );
}