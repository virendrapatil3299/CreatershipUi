import React from "react";

const plans = [
  {
    name: "Scout",
    price: "$29",
    description: "For brands dipping their toes into data-driven partnerships",
    button: "Start Tracking Trends",
    href: "#scout-plan",
    features: [
      "Trending Creator Feed",
      "Basic filters (niche, engagement rate, growth rate)",
      "Weekly email digest of top 50 micro-creators",
    ],
  },
  {
    name: "Hunter",
    price: "$79",
    description: "For brands chasing viral opportunities",
    button: "Get Boom Alerts",
    href: "#hunter-plan",
    highlighted: true,
    features: [
      "Predictive viral scores",
      "Priority access to pre-viral creators",
      "Get Boom Alerts",
    ],
  },
  {
    name: "Agency",
    price: "$159",
    description: "For teams scaling 10+ campaigns/month",
    button: "Scale Your Campaigns",
    href: "#agency-plan",
    features: [
      "Add up to 5 team members",
      "Campaign autopilot + crisis management",
      "AI analyst & weekly reports",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          Pricing <span className="text-orange-500">& Plans</span>
        </h2>
        <p className="mt-4 text-xl text-gray-500">Choose a Plan That Fits Your Goals</p>
      </div>

      <div className="max-w-4xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-[40px] transition-all shadow-[10px_10px_0px_0px_] shadow-[#f1c0b6] border-red-400 border-2 ${
              plan.highlighted
                ? "bg-gradient-to-br from-orange-400 to-red-400 text-white border-none scale-[1.03] "
                : "bg-[#FFF6F4] shadow-[10px_10px_0px_0px_] shadow-[#f1c0b6]"
            }`}
          >
            <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
            <p className={`text-center text-sm mb-6 ${plan.highlighted ? "text-white/90" : "text-[#3F3D56]"}`}>
              {plan.description}
            </p>

            <div className="text-center text-4xl font-bold mb-1">
              {plan.price}
              <span className="text-lg font-medium ml-1">
                /month
              </span>
            </div>

            <a
              href={plan.href}
              className={`block text-center mt-6 py-3 rounded-full shadow-[5px_5px_0px_0px_] shadow-[#f1c0b6] font-semibold transition ${
                plan.highlighted
                  ? "bg-white text-orange-500 hover:opacity-90"
                  : "bg-gradient-to-r from-[#FF6A4D] to-[#FF8C6C] text-white hover:opacity-90"
              }`}
            >
              {plan.button}
            </a>

            <hr className={`my-6 ${plan.highlighted ? "border-white/30" : "border-[#F2E6E3]"}`} />

            <ul className={`space-y-4 text-base ${plan.highlighted ? "text-white/90" : "text-[#3F3D56]"}`}>
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className={`w-6 h-6 mr-3 flex items-center justify-center  rounded-full text-sm ${
                    plan.highlighted ? "bg-white/20 text-white" : "bg-[#FFE9E3] text-[#FF6A4D] "
                  }`}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
