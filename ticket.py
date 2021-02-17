###
# Quick textual generation of citations based on citation format within Ohio (Lake County)
# Creates similar outline to real citations from input and numerical selections to speed up writing process in-game.
###

# As a user, I want to be able to run the script and then provide relevant information regarding the civilian and offenses,
# and then have the full format returned to me when I cease execution.
# I want to be able to provide the time and date of the offense, the vehicle information, and where the offense occurred.
# I want to select between speed, OVI, driver license infraction, safety belt, or other offenses, and provide the relevant information for each.
# I would like to be able to mark additional information such as holding driver's license or seizing vehicle.
# I would like to be able to list the conditions of the pavement, weather, area, etc.
# I would like to be able to add remarks in textual format.
# I would like to be able to mark if any criminal charges (felony) occurred and the number of offenses committed.


def set_context():
    vehicle = None
    lic = None
    operation_types={
        0: "Operated",
        1: "Passenger",
        2: "Parked",
        3: "Walked at"
    }
    vehicle_types = {
        0: 'Passenger',
        1: 'Motorcycle',
        2: 'Bicycle',
        3: 'Commercial',
        4: 'Other'
    }

    date = input("Date: ")
    time = input("Time: ")
    operation_type = int(input("Operated (0), Passenger (1), Parked (2), Walked (3): "))

    vehicle_type_str = ''
    if operation_type != 3:
        vehicle_type = int(input("Passenger (0), Motorcycle (1), Bicycle (2), Commercial (3), Other (4): "))
        vehicle_type_str = vehicle_types.get(vehicle_type, -1)
        if vehicle_type == 4:
            other_vehicle_type = input("Other: ")
            vehicle_type_str = vehicle_types.get(4) + ": " + other_vehicle_type
        vehicle = input("Vehicle: ")
        lic = input("LIC: ")

    upon_location = input("Street: ")
    direction = input("Direction: ")
    at_or_near = input("At/near: ")

    statements = [
        ["ON", date, "AT", time],
        ["SUBJECT", operation_types.get(operation_type, -1), vehicle_type_str],
        ["UPON A PUBLIC HIGHWAY, NAMELY", upon_location, "DIRECTION", direction],
        ["AT/NEAR", at_or_near]
    ]

    if operation_type != 3:
        statements.insert(2, ["VEHICLE:", vehicle, "LIC#", lic])

    return statements


def set_offenses():
    statements = []

    speed = int(input("Speed [Yes (0), No (1)]: "))
    # TODO: OVI
    driver_license = int(input("DL [Yes (0), No (1)]: "))
    # TODO: SAFETY BELT
    other_offense = int(input("Other [Yes (0), No (1)]"))

    if speed == 0:
        speed_type={
            0: 'Over limits',
            1: 'Unsafe for conditions',
            2: 'ACDA'
        }
        capture_type={
            0: 'Radar',
            1: 'Air',
            2: 'VASCAR',
            3: 'PACE',
            4: 'LASER'
        }
        motion_type={
            0: 'Stationary',
            1: 'Moving'
        }
        violation_type={
            0: '11-01',
            1: '11-22',
            2: '11-23'
        }

        amount = input("Speed: ")
        limit = input("Limit: ")
        sp_type = int(input("Over limits (0), Unsafe (1), ACDA (2): "))
        capture = int(input("Radar (0), Air (1), VASCAR (2), PACE (3), LASER (4): "))
        motion = int(input("Stationary (0), Moving (1): "))
        violation = int(input("Minor (0), Major (1), Felony (2): "))

        statements.append(["SPEED:", amount, "MPH in", limit, "zone"])
        statements.append([speed_type.get(sp_type, -1)])
        statements.append([capture_type.get(capture, -1), motion_type.get(motion, -1)])
        statements.append(["PC" + violation_type.get(violation, -1)])

    if driver_license == 0:
        violation_type={
            0: '14-02',
            1: '8-01',
            2: '11-14'
        }
        # TODO
        a = True

    if other_offense == 0:
        # TODO
        a = True

    return statements


def set_conditions():
    statements = []
    return statements


def set_remarks():
    statements = []
    return statements


def print_ticket():
    context = set_context()
    offenses = set_offenses()

    for line in context:
        print(*line)
    print("============================")
    for line in offenses:
        print(*line)


print()
print_ticket()