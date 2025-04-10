import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'create_account':
        // Simulate account creation
        return NextResponse.json({
          success: true,
          message: 'Account created successfully',
          data: {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            createdAt: new Date().toISOString()
          }
        });

      case 'check_availability':
        // Simulate availability check
        const availableSlots = generateTimeSlots();
        return NextResponse.json({
          success: true,
          availableSlots
        });

      case 'book_appointment':
        // Simulate booking
        return NextResponse.json({
          success: true,
          message: 'Appointment booked successfully',
          bookingId: Math.random().toString(36).substr(2, 9),
          ...data
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateTimeSlots() {
  const slots = [];
  const now = new Date();
  const startHour = 9;
  const endHour = 17;
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    for (let hour = startHour; hour < endHour; hour++) {
      if (Math.random() > 0.3) { // 70% chance of availability
        slots.push({
          date: date.toISOString().split('T')[0],
          time: `${hour}:00`,
          available: true
        });
      }
    }
  }
  
  return slots;
} 