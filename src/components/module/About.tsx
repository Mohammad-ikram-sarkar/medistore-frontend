import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Shield, Users, Award, Stethoscope, Activity, Clock, CheckCircle2 } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Heart,
            title: "Patient-Centered Care",
            description: "We put our patients first, ensuring compassionate and personalized healthcare experiences tailored to individual needs."
        },
        {
            icon: Shield,
            title: "Safety & Quality",
            description: "Maintaining the highest standards of medical safety and quality care through evidence-based practices and continuous improvement."
        },
        {
            icon: Users,
            title: "Expert Team",
            description: "Our multidisciplinary team of healthcare professionals brings decades of combined experience and specialized expertise."
        },
        {
            icon: Award,
            title: "Excellence",
            description: "Committed to clinical excellence and innovation in healthcare delivery, research, and medical education."
        }
    ];

    const stats = [
        { number: "25+", label: "Years Experience" },
        { number: "50K+", label: "Patients Served" },
        { number: "100+", label: "Healthcare Professionals" },
        { number: "98%", label: "Patient Satisfaction" }
    ];

    const services = [
        "Primary Care & Preventive Medicine",
        "Specialized Medical Consultations",
        "Emergency & Urgent Care",
        "Diagnostic Imaging & Laboratory Services",
        "Surgical Procedures",
        "Rehabilitation & Physical Therapy",
        "Mental Health & Counseling",
        "Telemedicine Services"
    ];

    return (
        <div className="min-h-screen bg-background  ">
            {/* Hero Section */}
            <div className=" py-20 px-4 ">
                <div className="max-w-6xl mx-auto bg-primary text-primary-foreground  py-20 px-4 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Stethoscope className="w-8 h-8" />
                        <Badge variant="secondary">
                            Healthcare Excellence Since 1999
                        </Badge>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 mt-10">About Our Healthcare Center</h1>
                    <p className="text-xl text-primary-foreground/90 max-w-3xl">
                        Dedicated to providing comprehensive, compassionate, and cutting-edge healthcare services 
                        to our community. Your health and wellbeing are our top priorities.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6">
                                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Mission Section */}
                <Card className="mb-16">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="w-6 h-6 text-primary" />
                            <CardTitle className="text-3xl">Our Mission</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-lg text-foreground leading-relaxed">
                            To deliver exceptional healthcare services that improve the health and wellbeing of our 
                            community through innovative medical practices, compassionate care, and a commitment to 
                            excellence in every patient interaction.
                        </p>
                        <Separator />
                        <p className="text-muted-foreground leading-relaxed">
                            We believe that quality healthcare is a fundamental right. Our integrated approach combines 
                            advanced medical technology, evidence-based treatments, and a patient-centered philosophy 
                            to ensure the best possible outcomes for everyone we serve.
                        </p>
                    </CardContent>
                </Card>

                {/* Core Values */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index} className="hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-primary/10 rounded-lg">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl mb-2">{value.title}</CardTitle>
                                                <CardDescription className="text-base leading-relaxed">
                                                    {value.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Services Section */}
                <Card className="mb-16">
                    <CardHeader>
                        <CardTitle className="text-3xl">Comprehensive Healthcare Services</CardTitle>
                        <CardDescription className="text-base">
                            We offer a full spectrum of medical services to meet all your healthcare needs
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            {services.map((service, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-foreground">{service}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Commitment Section */}
                <Card className="bg-primary text-primary-foreground">
                    <CardContent className="py-12 px-8">
                        <div className="flex items-start gap-4 mb-6">
                            <Clock className="w-8 h-8 mt-1" />
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Our Commitment to You</h3>
                                <p className="text-primary-foreground/90 leading-relaxed mb-4">
                                    We are committed to being your trusted healthcare partner throughout your wellness journey. 
                                    Our doors are open 24/7 for emergency care, and our dedicated team is always here to support 
                                    you with prompt, professional, and personalized medical attention.
                                </p>
                                <p className="text-primary-foreground/90 leading-relaxed">
                                    Whether you need routine check-ups, specialized treatment, or emergency care, we combine 
                                    medical expertise with genuine compassion to ensure you receive the highest quality 
                                    healthcare experience possible.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default About;