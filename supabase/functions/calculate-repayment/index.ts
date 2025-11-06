import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RepaymentCalculation {
  approvedAmount: number;
  repaymentPercentage: number;
  totalRepaymentAmount: number;
  estimatedMonthlyRevenue: number;
  estimatedCompletionMonths: number;
  monthlyRepaymentAmount: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { approvedAmount, repaymentPercentage, estimatedMonthlyRevenue } = await req.json();

    if (!approvedAmount || !repaymentPercentage || !estimatedMonthlyRevenue) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate total repayment amount
    const totalRepaymentAmount = approvedAmount * (1 + repaymentPercentage / 100);

    // Calculate monthly repayment amount based on percentage of revenue
    const monthlyRepaymentAmount = estimatedMonthlyRevenue * (repaymentPercentage / 100);

    // Estimate months to complete repayment
    const estimatedCompletionMonths = monthlyRepaymentAmount > 0 
      ? Math.ceil(totalRepaymentAmount / monthlyRepaymentAmount)
      : 0;

    const calculation: RepaymentCalculation = {
      approvedAmount,
      repaymentPercentage,
      totalRepaymentAmount: parseFloat(totalRepaymentAmount.toFixed(2)),
      estimatedMonthlyRevenue,
      estimatedCompletionMonths,
      monthlyRepaymentAmount: parseFloat(monthlyRepaymentAmount.toFixed(2)),
    };

    console.log('Repayment calculation:', calculation);

    return new Response(
      JSON.stringify(calculation),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calculating repayment:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});